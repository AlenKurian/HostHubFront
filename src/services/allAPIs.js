import { serverURL } from './serverURL'
import commonAPI from './commonAPI'

// 1 Register User
export const RegisterUserAPI = async (reqBody) => {
    return await commonAPI('POST',`${serverURL}/api/register`,reqBody,{})
}

//2 login
export const loginUserAPI = async (reqBody) => {
    return await commonAPI('POST', `${serverURL}/api/login`, reqBody, {})
}

//3 googlelogin function
export const googleLoginUserAPI = async (reqBody) => {
    return await commonAPI('POST', `${serverURL}/api/google-login`, reqBody, {})
}

//4 addevent api
export const addEventAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${serverURL}/api/add-event`, reqBody, reqHeader)
}

//5 getevents api
export const getAllEventsAPI = async (reqHeader) => {
    return await commonAPI('GET', `${serverURL}/api/get-events`, {}, reqHeader)
}

//6 gethomeevents api
export const getHomeEventsAPI = async () => {
    return await commonAPI('GET', `${serverURL}/api/approved-home-events`, {}, {})
}

//7 viewevent api
export const viewEventsAPI = async (id, reqHeader) => {
    return await commonAPI('GET', `${serverURL}/api/viewEvent/${id}`, {}, reqHeader)
}

//8 bookevent api
export const bookEventAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST',`${serverURL}/api/book-event`, reqBody, reqHeader)
}

//9 bookings api
export const getBookingsAPI = async (reqHeader) => {
    return await commonAPI('GET', `${serverURL}/api/get-bookings`, {}, reqHeader)
}

//10 deleteevent api
export const deleteEventAPI = async (reqBody, reqHeader) => {
    return await commonAPI('DELETE',`${serverURL}/api/admin-delete-events`,reqBody, reqHeader)
}

//11 admindashboard api
export const getAdminDashboardAPI = async (reqHeader) => {
    return await commonAPI('GET', `${serverURL}/api/admin-dashboard`, {}, reqHeader)
}

//12 getalluser api
export const getAllUserAPI = async (reqHeader) => {
    return await  commonAPI('GET',`${serverURL}/api/get-users`, {}, reqHeader)
}

//13 deleteuser api
export const deleteUserAPI = async (id, reqHeader) => {
    return await  commonAPI('DELETE',`${serverURL}/api/admin-delete/${id}`, {}, reqHeader)
}

//12 getalluser api
export const getAllOrganizerAPI = async (reqHeader) => {
    return await commonAPI('GET', `${serverURL}/api/get-organizers`, {}, reqHeader)
}

//13 orgdeleteevent api
export const orgDeleteEventAPI = async (id, reqHeader) => {
    return await commonAPI('DELETE', `${serverURL}/api/org-delete-event/${id}`, {}, reqHeader)
}

//14 updateevent api
export const updateEventAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI('PUT', `${serverURL}/api/update-event/${id}`, reqBody, reqHeader)
}

//15 pendingevents api
export const pendingEventsAPI = async (reqHeader) => {
    return await commonAPI('GET', `${serverURL}/api/pending-events`, {}, reqHeader)
}

//16 approve event  api
export const approveEventsAPI = async (id, reqHeader) => {
    return await commonAPI('PUT',`${serverURL}/api/approve-event/${id}`, {}, reqHeader)
}

//17 reject event api
export const rejectEventsAPI = async (id, reqHeader) => {
    return await commonAPI('PUT',`${serverURL}/api/reject-event/${id}`, {}, reqHeader)
}

//18 buy event ticket api
export const buyEventTicketAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI('PUT', `${serverURL}/api/makePayment/${id}`, reqBody, reqHeader)
}

//19 getmybookings api
export const getMyBookingsAPI = async (id, reqHeader) => {
    return await commonAPI('GET',`${serverURL}/api/get-bookings/${id}`, {}, reqHeader)
}

export const getApprovedEventsAPI = async () => {
    return await commonAPI('GET', `${serverURL}/api/approved-events`, {}, {})
}