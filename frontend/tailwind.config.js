export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#e8ddd1',
                section: '#f1ebe3',
                items: '#f5f1eb',
                border: '#b8956a',
                green: '#8b9d83',
                hovergreen: '#8b9d70',
                yellow: '#b8956a',
                red: '#c4735a',
                txtprimary: '#767065',
            },
        },
    },
    safeList: ['bg-red', 'bg-yellow', 'bg-green'],
}
