import 'package:bioreino_mobile/controller/database/dao/courses_dao.dart';
import 'package:bioreino_mobile/controller/database/mongodb_database.dart';
import 'package:bioreino_mobile/model/lesson.dart';
import 'package:flutter/widgets.dart';

class LessonsDAO {
  static Future<List<Lesson>> getAllFrom(String courseTitle, BuildContext context) async {
    await Database.connectOrError(context);

    List<Lesson> lessonsList = await _searchLessons(courseTitle);
    _setLessonsToCourse(courseTitle, lessonsList);
    return lessonsList;
  }

  static Future<List<Lesson>> _searchLessons(String courseTitle) async {
    List<Map<String, dynamic>>? lessons = await Database.lessonsCollection
        ?.find({"courseTitle": courseTitle}).toList();
    List<Lesson> lessonsList = lessons?.map((e) => Lesson(e)).toList() ?? [];
    return lessonsList;
  }

  static void _setLessonsToCourse(
      String courseTitle, List<Lesson> lessonsList) {
    for (var course in CoursesDAO.coursesList) {
      if (course.name == courseTitle) {
        course.lessons = lessonsList;
      }
    }
  }
}
