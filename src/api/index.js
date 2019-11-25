import axiosInstance from './request'

export const reqLogin = function (username,password) {
  return axiosInstance({
    method: 'POST',
    url: '/login',
    data: {
      username: username,
      password: password
    }
  })
}

export const reqGetCategories = function () {
  return axiosInstance({
    method: 'GET',
    url: '/category/get',
  })
}

export const reqAddCategory = function (categoryName) {
  return axiosInstance({
    method: 'POST',
    url: '/category/add',
    data: {
      categoryName: categoryName
    }
  })
}

//请求分类列表数据
export const reqGategories = function () {
  return axiosInstance({
    method: 'GET',
    url: '/category/get',
  })
}
