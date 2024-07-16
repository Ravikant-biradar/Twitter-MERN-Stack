function timeAgo(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  
  // Calculate the difference in milliseconds
  const diff = now - date;
  
  // Convert the difference to seconds
  const seconds = Math.floor(diff / 1000);
  
  // Define time periods in seconds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  
  // Determine the appropriate time period
  if (seconds < minute) {
    return seconds + " seconds ago";
  } else if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    return hours + (hours === 1 ? " hour ago" : " hours ago");
  } else if (seconds < month) {
    const days = Math.floor(seconds / day);
    return days + (days === 1 ? " day ago" : " days ago");
  } else if (seconds < year) {
    const months = Math.floor(seconds / month);
    return months + (months === 1 ? " month ago" : " months ago");
  } else {
    const years = Math.floor(seconds / year);
    return years + (years === 1 ? " year ago" : " years ago");
  }
}

export default timeAgo





