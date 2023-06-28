part of login_screen;

class Header extends StatelessWidget {
  const Header(
    this.headerText, {
    super.key,
  });

  final String headerText;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(32, 32, 32, 0),
      child: Text(
        headerText,
        style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.bold,
              fontSize: 8 * 5,
            ),
        textAlign: TextAlign.center,
      ),
    );
  }
}
