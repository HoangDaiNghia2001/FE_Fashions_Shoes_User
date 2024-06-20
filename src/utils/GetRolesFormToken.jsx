import jwt from 'jwt-decode'

export const GetRolesFormToken = (token) => {
    return jwt(token).roles.replace('[', '').replace(']', '').split(',')
}