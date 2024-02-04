export const baseUrl='https://api.coincap.io'

export const endPoints={
    fetchedCoinDetails: {
        allcoins: '/v2/assets',
        slugdetails:  (id: number) => `/v2/assets/${id}`
    }
}