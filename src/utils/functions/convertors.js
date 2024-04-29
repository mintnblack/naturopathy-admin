const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November","December"];
const shortMonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov","Dec"];

export function formatDateToDDMMYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Note: Months are zero-based, so we add 1.
    const year = String(date.getFullYear()).slice(-2); // Extract last two digits of the year.
    const getFullYear= String(date.getFullYear());
    const formattedDate = {
        day: day,   
        month: month,
        year: year,
        fullYear: getFullYear,
        monthName: monthArray[month-1],
        shortMonthName: shortMonthArray[month-1],
    }

    return formattedDate;
  }

  export function getCurrentDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

  export const toFindDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekIndex = date.getDay();
    const dayOfWeek = weekdays[dayOfWeekIndex];
    return dayOfWeek
  }

  
  export function extractVideoId(youtubeLink) {
    var videoId = youtubeLink.split('v=')[1];
    if (videoId) {
        // Extract the video ID, which is the characters following "v="
        var ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
        return videoId;
    } else {
        // Handle cases where the link doesn't contain a video ID
        return null;
    }
}