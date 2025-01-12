const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v1";

const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    // RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    // RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// PROFILE ENDPOINTS
// const profileEndpoints = {
//   GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
//   GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
//   GET_ALL_INSTRUCTOR_DASHBOARD_DETAILS_API:
//     BASE_URL + "/profile/getInstructorDashboardDetails",
// };


// const categories = {
//     CATEGORIES_API: BASE_URL + "/course/showAllCategories",
// };

// const catalogData = {
//   CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
// };

// const contactusEndpoint = {
//     CONTACT_US_API: BASE_URL + "/contact/contactUs",
//   };


//   // COURSE ENDPOINTS
// const courseEndpoints = {
//     GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
//     COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
//     EDIT_COURSE_API: BASE_URL + "/course/editCourse",
//     COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
//     CREATE_COURSE_API: BASE_URL + "/course/createCourse",
//     CREATE_SECTION_API: BASE_URL + "/course/addSection",
//     CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
//     UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
//     UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
//     GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
//     DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
//     DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
//     DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
//     GET_FULL_COURSE_DETAILS_AUTHENTICATED:BASE_URL + "/course/getFullCourseDetails",
//     LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
//     CREATE_RATING_API: BASE_URL + "/course/createRating",
//     ADD_COURSE_TO_CATEGORY_API: BASE_URL + "/course/addCourseToCategory",
//     SEARCH_COURSES_API: BASE_URL + "/course/searchCourse",
//     CREATE_CATEGORY_API: BASE_URL + "/course/createCategory",
//   };


// // SETTINGS PAGE API
// const settingsEndpoints = {
//   UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
//   UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
//   CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
//   DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
// };

// const ratingsEndpoints = {
//   REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
// };

// const studentEndpoints = {
//   COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
//   COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
//   SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
// };

// export { categories, endpoints,contactusEndpoint,courseEndpoints,profileEndpoints,settingsEndpoints,catalogData,ratingsEndpoints,studentEndpoints};
export {endpoints} 