import { guestInstance, authInstance } from './index.js'

/*
 * Создание, обновление и удаление типа товара, получение списка всех типов 
 */
export const createType = async (type) => {
    const { data } = await authInstance.post('type/create', type)
    return data;
}

export const updateType = async (id, type) => {
    const { data } = await authInstance.put(`type/update/${id}`, type)
    return data;
}

export const deleteType = async (id) => {
    const { data } = await authInstance.delete(`type/delete/${id}`)
    return data;
}

export const fetchTypes = async () => {
    const { data } = await guestInstance.get('type/getall')
    return data;
}

export const fetchType = async (id) => {
    const { data } = await guestInstance.get(`type/getone/${id}`)
    return data;
}

/*
 * Создание, обновление и удаление бренда, получение списка всех брендов
 */
export const createBrand = async (brand) => {
    const { data } = await authInstance.post('brand/create', brand)
    return data;
}

export const updateBrand = async (id, brand) => {
    const { data } = await authInstance.put(`brand/update/${id}`, brand)
    return data;
}

export const deleteBrand = async (id) => {
    const { data } = await authInstance.delete(`brand/delete/${id}`)
    return data;
}

export const fetchBrands = async () => {
    const { data } = await guestInstance.get('brand/getall')
    return data;
}

export const fetchBrand = async (id) => {
    const { data } = await guestInstance.get(`brand/getone/${id}`)
    return data;
}

/*
 * Создание, обновление и удаление товара, получение списка всех товаров
 */
export const createDevice = async (device) => {
    const { data } = await authInstance.post('device/create', device)
    return data;
}

export const updateDevice = async (id, device) => {
    const { data } = await authInstance.put(`device/update/${id}`, device)
    return data;
}

export const deleteDevice = async (id) => {
    const { data } = await authInstance.delete(`device/delete/${id}`)
    return data;
}

export const fetchAllDevices = async (typeId = null, brandId = null, page = 1, limit = 3) => {
    let url = 'device/getall'
    // фильтрация товаров по категории и/или бренду
    if (typeId) url = url + '/typeId/' + typeId
    if (brandId) url = url + '/brandId/' + brandId
    const { data } = await guestInstance.get(
        url,
        {params: { // GET-параметры для постраничной навигации
            page, limit
        }
    })
    return data;
}

export const fetchOneDevice = async (id) => {
    const { data } = await guestInstance.get(`device/getone/${id}`)
    return data;
}

export const fetchDeviceRating = async (id) => {
    const { data } = await guestInstance.get(`rating/device/${id}`)
    return data;
}

/*
* Создание, обновление и удаление характеристик товара
*/
export const createProperty = async (deviceId, property) => {
    const { data } = await authInstance.post(`device/${deviceId}/property/create`, property)
    return data;
}

export const updateProperty = async (deviceId, id, property) => {
    const { data } = await authInstance.put(`device/${deviceId}/property/update/${id}`, property)
    return data;
}

export const deleteProperty = async (deviceId, id) => {
    const { data } = await authInstance.delete(`device/${deviceId}/property/delete/${id}`)
    return data;
}