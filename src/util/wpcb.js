function wpcb(err, stats) {
  if (err || stats.hasErrors()) {
    if (err) {
      console.log(err)
    } else {
      for (let i = 0; i < stats.compilation.errors.length; i++) {
        const error = stats.compilation.errors[i]
        console.log(error)
      }
    }
  } else {
    console.log('Finished building')
  }
}

export { wpcb }
