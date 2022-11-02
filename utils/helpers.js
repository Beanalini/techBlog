module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  //helper function to check if logged in user owns a comment
  ifSame: (p1, p2) => {
    console.log(p1);
    console.log(p2);
    
    if (p1 === p2) {
      return true;
    } else {
      return false;
    }

  },

};
