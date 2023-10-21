export const AsideMenuAdminGeneral = {
    items: [
      {
        title: 'Dashboard',
        root: true,
        name: "dashboard",
        icon: 'flaticon2-architecture-and-city',
        svg: './assets/media/svg/icons/Design/Layers.svg',
        page: '/dashboard',
        translate: 'MENU.DASHBOARD',
        bullet: 'dot',
      },
      { section: 'Usuario' },
      {
        title: 'Usuarios',
        root: true,
        name: "users",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/General/User.svg',
        page: '/users',
        submenu: [
          {
            title: 'Gestion Usuarios',
            page: '/users/list'
          }
        ]
      },
      { section: 'Productos' },
      {
        title: 'Categorias',
        root: true,
        name: "categorias",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Home/Commode2.svg',
        page: '/categorias',
        submenu: [
          // solo hay una página porque los formularios son ventanas emergentes
          {
            title: 'Lista categorias',
            page: '/categorias/list'
          }
        ]
      },
      {
        title: 'Productos',
        root: true,
        name: "productos",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Devices/TV2.svg',
        page: '/productos',
        submenu: [
          // hay tres páginas distintas
          {
            title: 'Crear Producto',
            page: '/productos/registrar-producto'
          },
          {
            title: 'Lista Producto',
            page: '/productos/lista-de-todos-los-productos'
          }
        ]
      },
      {
        title: 'Sliders',
        root: true,
        name: "sliders",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Design/Image.svg',
        page: '/sliders',
        submenu: [
          // solo hay una página porque los formularios son ventanas emergentes
          {
            title: 'Lista sliders',
            page: '/sliders/lista-sliders'
          }
        ]
      },
      {
        title: 'Cupones',
        root: true,
        name: "cupones",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Devices/Cardboard-vr.svg',
        page: '/cupones',
        submenu: [
          {
            title: 'Registrar Cupon',
            page: '/cupones/registrar-cupon'
          },
          {
            title: 'Lista Cupones',
            page: '/cupones/listar-cupones'
          },
        ]
      },
      {
        title: 'Descuentos',
        root: true,
        name: "descuentos",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/General/Clipboard.svg',
        page: '/descuentos',
        submenu: [
          {
            title: 'Registrar Descuento',
            page: '/descuentos/registrar-descuento'
          },
          {
            title: 'Lista Descuento',
            page: '/descuentos/listar-descuento'
          },
        ]
      },
    ]
}