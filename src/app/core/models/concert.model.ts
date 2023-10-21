export interface Concert {
    context: string,
    type: string,
    description: string,
    endDate: string,
    eventStatus: string,
    image: string,
    location: {
        type: string,
        address: {
            type: string,
            addressCountry: string,
            addressLocality: string,
            addressRegion: string,
            postalCode: string,
            streetAddress: string
        },
        geo: {
            type: string,
            latitude: number,
            longitude: number
        },
        name: string
    },
    name: string,
    performer: [],
    startDate: string
}


