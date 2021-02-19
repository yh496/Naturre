
const BusinessProfileContext = {
    name: "",
    description: "",
    location: "",
    images: "",
    services: "",
    manager: "",
}


export const initializeBusinessProfile = async (businessId) => {
    let response = await fetchBusinessProfile(businessId)
    BusinessProfileContext.name = response.data.name
    BusinessProfileContext.description = response.data.description
    BusinessProfileContext.location = response.data.location
    BusinessProfileContext.images = response.data.images
    BusinessProfileContext.services = response.data.services
    BusinessProfileContext.manager = response.data.manager
    return BusinessProfileContext
}

export const getBusinessProfileContext = () => {
    return BusinessProfileContext;
}



const fetchBusinessProfile = async (businessId) => {
    let response = await fetch('/api/business-profile/business-detail', {
        method: 'POST',
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ id: businessId })
    })

    response = await response.json();

    return response

}

export default { initializeBusinessProfile, getBusinessProfileContext}