for (i = 0; i < document.all.length; i++) {
    if (document.all[i].tagName == 'A') {
        with(document.all[i].style) {
            if (backgroundColor == 'yellow') {
                void(backgroundColor = document.bgColor)
            } else {
                void(backgroundColor = 'yellow')
            }
        }
    }
}