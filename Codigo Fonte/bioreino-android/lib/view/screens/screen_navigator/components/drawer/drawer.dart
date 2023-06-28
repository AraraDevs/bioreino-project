library drawer;

import 'package:bioreino_mobile/controller/screens/screen_navigator/components/drawer_controller.dart';
import 'package:bioreino_mobile/controller/screens/screen_navigator/pages_enum.dart';
import 'package:bioreino_mobile/controller/screens/screen_navigator/updatable_drawer_mixin.dart';
import 'package:bioreino_mobile/controller/screens/route_handler.dart';
import 'package:bioreino_mobile/controller/util/string_util.dart';
import 'package:bioreino_mobile/controller/util/theme_util.dart';
import 'package:bioreino_mobile/view/global_components/assets/brassets.dart';
import 'package:bioreino_mobile/view/screens/credits/credits_screen.dart';
import 'package:bioreino_mobile/view/screens/splash_screen/splash_screen.dart';
import 'package:bioreino_mobile/view/themes/theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

part 'components/drawer_content.dart';
part 'components/drawer_text.dart';
part 'components/drawer_title.dart';
part 'components/exit_button.dart';
part 'components/logout_dialog.dart';

class BRDrawer extends Drawer {
  BRDrawer(final BuildContext context, final UpdatableDrawer navigator,
      {super.key})
      : super(
          elevation: 0,
          backgroundColor: Theme.of(context).scaffoldBackgroundColor,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          child: CustomScrollView(
            physics: MediaQuery.of(context).orientation == Orientation.portrait
                ? const NeverScrollableScrollPhysics()
                : const BouncingScrollPhysics(),
            slivers: [
              SliverFillRemaining(
                hasScrollBody: false,
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(8, 8, 8, 0),
                      child: Column(
                        children: [
                          DrawerTitle("menu", context),
                          DrawerContent(
                            navigator,
                            context,
                            page: Pages.home,
                            leadingSvgPath: "assets/drawer_icons/home_icon.svg",
                            text: "home",
                          ),
                          DrawerContent(
                            navigator,
                            context,
                            page: Pages.courses,
                            leadingSvgPath:
                                "assets/drawer_icons/courses_icon.svg",
                            text: "cursos",
                          ),
                        ],
                      ),
                    ),
                    Divider(color: BRColors.greyText),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8.0,
                        vertical: 8.0,
                      ),
                      child: Column(
                        children: [
                          DrawerTitle("perfil", context),
                          DrawerContent(
                            navigator,
                            context,
                            page: Pages.account,
                            leadingSvgPath: "assets/drawer_icons/user_icon.svg",
                            text: "conta",
                          ),
                        ],
                      ),
                    ),
                    const Spacer(),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(
                            left: 12.0,
                            bottom: 8.0,
                          ),
                          child: TextButton(
                            onPressed: () => changeScreen(
                              context,
                              const CreditsScreen(),
                              dontReplace: true
                            ),
                            style: flatButtonStyle().copyWith(
                              foregroundColor: MaterialStatePropertyAll(
                                BRColors.greyText,
                              ),
                            ),
                            child: DrawerText(
                              "Créditos",
                              context,
                              color: BRColors.greyText,
                            ),
                          ),
                        ),
                        const ExitButton(),
                      ],
                    ),
                  ],
                ),
              )
            ],
          ),
        );

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(8, 8, 8, 16),
        child: super.build(context),
      ),
    );
  }
}
