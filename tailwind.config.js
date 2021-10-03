const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                emerald: colors.emerald,
                fuchsia: colors.fuchsia,
                trueGray: colors.trueGray,
                rose: colors.rose,
                amber: colors.amber,
                orange: colors.orange,
                sky: colors.sky,
                teal: colors.teal,
                cyan: colors.cyan,
                lime: colors.lime,
                warmGray: colors.warmGray,
                trueGray: colors.trueGray,
                coolGray: colors.coolGray,
                blueGray: colors.blueGray,
                'th-background': 'var(--background)',
                'th-background-secondary': 'var(--background-secondary)',
                'th-primary-dark': 'var(--primary-dark)',
                'th-primary-medium': 'var(--primary-medium)',
                'th-primary-light': 'var(--primary-light)',
                'th-accent-dark': 'var(--accent-dark)',
                'th-accent-medium': 'var(--accent-medium)',
                'th-accent-light': 'var(--accent-light)',
            },
            gridTemplateRows: {
                '[auto,auto,1fr]': 'auto auto 1fr',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms'),
    ],
}