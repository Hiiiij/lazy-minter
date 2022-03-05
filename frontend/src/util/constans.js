
const BREAKPOINTS = {
  tabletMin: 550,
  laptopMin: 1100,
  desktopMin: 1500
}

const QUERIES = {
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin}px)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin}px)`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin}px)`
}

const FONTWEIGHTS = {
  sofiaRegular: 400,
  sofiaSemiBold: 600,
  sofiaBlack: 900
}
const FONTSIZE = {
  p: {
    small: '1rem',
    medium: '1.2rem',
    large: '1.5 rem'
  },
  h1: {
    small: '3rem',
    medium: '3.2rem',
    large: '3.5 rem'
  },
  h2: {
    small: '2rem',
    medium: '2.2rem',
    large: '2.5 rem'
  }

}

export const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://lazyminter.herokuapp.com'
    : 'http://localhost:8000'

export const THEME = {
  fontWeight: FONTWEIGHTS,
  queries: QUERIES,
  fontSize: FONTSIZE
}

// export { BREAKPOINTS, QUERIES
