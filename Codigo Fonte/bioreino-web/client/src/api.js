const API_URL_USER = '/api/user';
const API_URL_COURSE = '/api/course';
const API_URL_LESSON = '/api/lesson';
const API_URL_CATEGORY = '/api/category';

export function LOGIN(body) {
  return {
    url: API_URL_USER + '/login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function LOGIN_VALIDATE_TOKEN(token) {
  return {
    url: API_URL_USER + '/token/validate',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_GET(token) {
  return {
    url: API_URL_USER,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_POST(body) {
  return {
    url: API_URL_USER + '/register',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_LAST_LESSON_POST(body) {
  return {
    url: API_URL_USER + '/lastCourse',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_LAST_LESSON_GET(user) {
  return {
    url: API_URL_USER + `/lastCourse/${user}`,
    options: {
      method: 'GET',
    },
  };
}

export function USER_COURSES_PROGRESS_POST(body) {
  return {
    url: API_URL_USER + '/coursesProgress',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_COURSES_PROGRESS_GET(user) {
  return {
    url: API_URL_USER + `/coursesProgress/${user}`,
    options: {
      method: 'GET',
    },
  };
}

export function ALL_COURSES_GET({ limit }) {
  return {
    url: API_URL_COURSE + `/all/${limit}`,
    options: {
      method: 'GET',
    },
  };
}

export function COURSES_GET({ plan, category }) {
  return {
    url: API_URL_COURSE + `?_plan=${plan}&_category=${category}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
}

export function COURSES_BY_TITLE_GET(title) {
  return {
    url: API_URL_COURSE + '/' + title,
    options: {
      method: 'GET',
    },
  };
}

export function LESSONS_BY_TITLE_COURSE_GET(courseTitle) {
  return {
    url: API_URL_LESSON + '/' + courseTitle,
    options: {
      method: 'GET',
    },
  };
}

export function LESSONS_BY_URL_COURSE_GET(courseUrl) {
  return {
    url: API_URL_LESSON + '/' + courseUrl,
    options: {
      method: 'GET',
    },
  };
}

export function ALL_CATEGORIES_GET() {
  return {
    url: API_URL_CATEGORY + '/all',
    options: {
      method: 'GET',
    },
  };
}
