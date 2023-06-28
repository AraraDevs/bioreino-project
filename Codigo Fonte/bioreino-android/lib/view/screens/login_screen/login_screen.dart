library login_screen;

import 'package:bioreino_mobile/controller/screens/login_screen/login_form_controller.dart';
import 'package:bioreino_mobile/controller/screens/screen_navigator/connection.dart';
import 'package:bioreino_mobile/view/global_components/assets/brassets.dart';
import 'package:bioreino_mobile/view/global_components/widgets/green_button.dart';
import 'package:bioreino_mobile/view/themes/theme.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:url_launcher/url_launcher.dart';

part 'components/arara_bg.dart';
part 'components/login_box_bg.dart';
part 'components/login_button.dart';
part 'components/login_field.dart';
part 'components/login_field_box.dart';
part 'components/login_header.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  // Strings
  final String _buttonText = "Entrar";
  final String _headerText = "Fazer Login";

  // ScaffoldKey -> Para mostrar snackbar
  static final GlobalKey<ScaffoldState> scaffoldKey =
      GlobalKey<ScaffoldState>();
  static final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  // Controllers
  static final TextEditingController emailController = TextEditingController();
  static final TextEditingController passwordController =
      TextEditingController();

  // States
  static bool wrongCredentials = false;
  static bool failedConnection = false;
  static bool buttonPressed = false;

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  void initState() {
    super.initState();
    clearFields();
    ConnectionChecker(context).setConnectionListener();
  }

  @override
  Widget build(BuildContext context) {
    tryLoginOnButtonPressed(
      context: context,
      formKey: LoginScreen.formKey,
      onWrongCredentials: () => setState(() {
        setWrongCredentials(true);
        SchedulerBinding.instance.addPostFrameCallback((_) {
          LoginScreen.formKey.currentState?.validate();
        });
      }),
      onConnectionError: () => setState(() => onFailedConnection()),
    );
    final bottomWidget = chooseBottomWidget(
      buttonText: widget._buttonText,
      formKey: LoginScreen.formKey,
      onPressed: () => setState(() => setLoginButtonPressed(true)),
    );

    return Stack(
      children: [
        const AraraBackGround(),
        LoginBoxBg(
          scaffoldKey: LoginScreen.scaffoldKey,
          child: Form(
            key: LoginScreen.formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Header(widget._headerText),
                LoginFieldBox(
                    LoginScreen.emailController,
                    LoginScreen.passwordController,
                    () => setState(() => setLoginButtonPressed(true))),
                Padding(
                  padding: const EdgeInsets.all(32),
                  child: bottomWidget,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
