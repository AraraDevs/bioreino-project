import 'dart:convert';

import 'package:bioreino_mobile/controller/database/dao/student_dao.dart';
import 'package:bioreino_mobile/controller/database/mongodb_database.dart';
import 'package:bioreino_mobile/controller/screens/login_screen/login_form_controller.dart';
import 'package:bioreino_mobile/controller/screens/route_handler.dart';
import 'package:bioreino_mobile/model/student.dart';
import 'package:bioreino_mobile/view/screens/connection_error_screen/connection_error_screen.dart';
import 'package:bioreino_mobile/view/screens/screen_navigator/screen_navigator.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void tryLogin({
  required BuildContext context,
  required GlobalKey<FormState> formKey,
  required String email,
  required String password,
  required void Function() onConnectionError,
  required void Function() onWrongCredentials,
}) async {
  if (formKey.currentState!.validate()) {
    // Check db connection before login
    if (Database.db == null) {
      setLoginButtonPressed(false);
      return onConnectionError();
    } else if (!Database.db!.isConnected) {
      bool successful = await Database.connect();
      if (context.mounted && !successful) {
        return changeScreen(context, const ConnectionErrorScreen());
      }
    }
    // Login
    await Future.delayed(const Duration(seconds: 1));
    LoginState result = LoginState.error;
    if (context.mounted) {
      result = await StudentDAO.login(context, email, password);
    }
    if (result == LoginState.logged) {
      if (context.mounted) changeScreen(context, const ScreenNavigator());
      return;
    } else if (result == LoginState.error) {
      onConnectionError();
    } else if (result == LoginState.wrongCredentials) {
      onWrongCredentials();
    }
    setLoginButtonPressed(false);
  }
}

Future<bool> checkStudentAlreadyLogged(BuildContext context) async {
  SharedPreferences preferences = await SharedPreferences.getInstance();
  String? studentString = preferences.getString(StudentDAO.studentKey);
  if (studentString != null) {
    Map<String, dynamic> normalizedMap = _normalizedStudentMap(studentString);
    StudentDAO.student = Student.fromMap(normalizedMap);
    if (context.mounted) {
      try {
        await StudentDAO.login(
          context,
          StudentDAO.student!.email,
          StudentDAO.student!.password!,
        );
      } catch (e) {
        return false;
      }
    }
    return true;
  }
  return false;
}

Map<String, dynamic> _normalizedStudentMap(String studentString) {
  final Map<String, dynamic> studentMap = jsonDecode(studentString);
  final Map<String, dynamic> normalizedMap = studentMap.map((key, value) {
    if (key == "subscriptionDate") {
      return MapEntry(key, DateTime.fromMillisecondsSinceEpoch(value));
    }
    return MapEntry(key, value);
  });
  return normalizedMap;
}
