import React from 'react';
import './CourseCatalog.css';

const categories = [
  {
    name: 'Computer Science',
    courses: [
      {
        name: 'CS50: Introduction to Computer Science',
        url: 'https://pll.harvard.edu/course/cs50-introduction-computer-science',
        provider: 'Harvard/edX',
      },
      {
        name: 'Khan Academy Computer Science',
        url: 'https://www.khanacademy.org/computing/computer-science',
        provider: 'Khan Academy',
      },
      {
        name: "CS50's Web Programming with Python and JavaScript",
        url: 'https://pll.harvard.edu/course/cs50s-web-programming-python-and-javascript',
        provider: 'Harvard/edX',
      },
    ],
  },
  {
    name: 'Languages',
    courses: [
      {
        name: 'Learn English for Free',
        url: 'https://www.duolingo.com/',
        provider: 'Duolingo',
      },
      {
        name: 'Spanish for Beginners',
        url: 'https://www.onlinefreespanish.com/#:~:text=Study%20Spanish%20for%20free%20with%20our%20bilingual%20OnLine,drills%2C%20games%2C%20worksheets%20and%20links%20to%20helpful%20sites.',
        provider: 'Coursera',
      },
    ],
  },
  {
    name: 'Math & Science',
    courses: [
      {
        name: 'Khan Academy Math',
        url: 'https://www.khanacademy.org/math',
        provider: 'Khan Academy',
      },
      {
        name: 'Crash Course Physics',
        url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtOPRKzVLY0jJY-uHOH9KVU6',
        provider: 'YouTube',
      },
    ],
  },
  {
    name: 'Web & Digital Skills',
    courses: [
      {
        name: 'Web Accessibility',
        url: 'https://www.edx.org/learn/web-accessibility',
        provider: 'edX',
      },
      {
        name: 'Google Digital Garage',
        url: 'https://learndigital.withgoogle.com/digitalgarage',
        provider: 'Google',
      },
    ],
  },
  {
    name: 'General Learning',
    courses: [
      {
        name: 'YouTube Learning',
        url: 'https://www.youtube.com/learning',
        provider: 'YouTube',
      },
      {
        name: 'Coursera Free Courses',
        url: 'https://www.coursera.org/courses?query=free',
        provider: 'Coursera',
      },
    ],
  },
];

const CourseCatalog = () => (
  <div className="course-catalog">
    {categories.map((cat, i) => (
      <div key={i} className="course-category">
        <h3 className="category-title">{cat.name}</h3>
        <ul className="course-list">
          {cat.courses.map((course, idx) => (
            <li key={idx} className="course-item">
              <a
                href={course.url}
                className="course-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Go to ${course.name} on ${course.provider}`}
              >
                {course.name} <span className="provider">({course.provider})</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default CourseCatalog;
