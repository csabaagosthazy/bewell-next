export interface Navigation {
    home: string,
    dashboard: string
}

export interface Page {
    title: string,
    description: string
}

export interface Auth {
    signin: string,
    signout: string
}


export interface Translation {
    navigation: Navigation
    page: {
        home: Page,
        dashboard: Page
    },
    auth: Auth
}
