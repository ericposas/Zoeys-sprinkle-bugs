exports.random_range = function (mn, mx){
  return Math.floor(Math.random() * (mx - mn + 1)) + mn;
}
