import 'dart:convert';

import 'package:bcrypt/bcrypt.dart';
import 'package:bioreino_mobile/controller/database/mongodb_database.dart';
import 'package:bioreino_mobile/model/student.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:shared_preferences/shared_preferences.dart';

abstract class StudentDAO {
  static Student? student;
  static const String studentKey = "student";

  static Future<LoginState> login(
    BuildContext context,
    String email,
    String password,
  ) async {
    bool isLogged = false;
    dynamic catchedError;
    await Database.connectOrError(context);

    await Database.studentsCollection?.findOne({"email": email}).then(
      (queryStudent) {
        try {
          isLogged = _checkPassword(password, queryStudent?["password"]);
        } on TypeError {
          throw WrongCredentialsException();
        }
        if (isLogged) {
          student = Student.fromMap(queryStudent!);
          _storeStudentPrefs(password);
        } else {
          throw WrongCredentialsException();
        }
      },
    ).catchError(
      (error, stackTrace) {
        isLogged = false;
        catchedError = error;
      },
    );

    if (catchedError is WrongCredentialsException) {
      return LoginState.wrongCredentials;
    } else if (catchedError != null) {
      return LoginState.error;
    } else {
      return LoginState.logged;
    }
  }

  static bool _checkPassword(String password, String hashedPassword) {
    return BCrypt.checkpw(password, hashedPassword);
  }

  static Future<void> _storeStudentPrefs(String password) async {
    if (StudentDAO.student != null) {
      final SharedPreferences preferences =
          await SharedPreferences.getInstance();
      StudentDAO.student!.password = password;

      preferences.setString(
        StudentDAO.studentKey,
        jsonEncode(StudentDAO.student?.toMap()),
      );
    }
  }

  static Future<void> logout(BuildContext context) async {
    final SharedPreferences preferences = await SharedPreferences.getInstance();
    await Future.delayed(const Duration(seconds: 1));
    preferences.clear();
    student = null;
    await DefaultCacheManager().emptyCache();
  }

  static Map<String, dynamic> defineQuery() {
    if (StudentDAO.student?.plan != "professional") {
      return {"plan": StudentDAO.student!.plan};
    } else {
      return {};
    }
  }
}

class WrongCredentialsException implements Exception {}

enum LoginState { logged, wrongCredentials, error }
