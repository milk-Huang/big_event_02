// 入口函数
$(function () {
    // 需求1:获取用户信息
    getUserInfo();//调用函数

})

// 获取用户信息(封装到入口函数的外面, 当做全局变量, 便于其他页面调用)
function getUserInfo() {
    // 发送ajax
    $.ajax({
        // 配置头信息 设置token ,身份识别认证
        url: '/my/userinfo',
        headers: ({
            // 重新登录
            Authorization: localStorage.getItem('token') || ""
        }),
        //方式:不写默认为 GET
        success: (res) => {
            // console.log(res);
            if (res.status != 0) {
                return layui.layui.msg(res.message);
            }
            // 请求成功 ,渲染头像
            renderAvatar(res.data);
        },
    })
}

// 头像与文字渲染封装
function renderAvatar(user) {
    // console.log(user);
    // 1.渲染用户名,如果有昵称以昵称为准
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 2.渲染头像
    if (user.user_pic == null) {
        // 隐藏图片头`,判断图片头像是否存在
        $('.layui-nav-img').hide();
        $('.text-avatar').show(), html(name[0].toUpperCase());
    } else {
        // 渲染图片头像,隐藏文字头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    }
}