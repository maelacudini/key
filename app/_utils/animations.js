export const navMenu = {
    open: {
        opacity: 1,
        x: '0%',
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
    },
    closed: {
        opacity: 0,
        x: '100%',
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
    }
}

export const overlay = {
    open: {
        opacity: 1,
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
    },
    closed: {
        opacity: 0,
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
    }
}

export const slidein = {
    initial: {
        opacity: 0,
        y: 20
    },
    enter: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            delay: 0.2 + (i * 0.1),
            ease: [.215, .61, .355, 1]
        }
    }),
    exit: {
        opacity: 0,
        transition: { duration: 0.25, type: "tween", ease: "easeInOut" }
    }
}


export const titleAnim = {
    initial: {
        y: '100%',
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
    },
    animate: (i) => ({
        y: '-10%',
        transition: { duration: 0.75, delay: 0.1 * (0.2 * i), type: "tween", ease: [0.76, 0, 0.24, 1] }
    })
}

