
import MaterialTable from 'material-table';
import 'material-icons/iconfont/material-icons.css';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Switch from '@mui/material/Switch';

const ShowMenu=()=> {
    
    return (
        <MaterialTable    
        // sx={{
        //     '& .MuiTableRow-head': { top: -1,  position: 'fixed !important', backgroundColor:'red' 
        //     },
        //   }}
        title='Danh sách món ăn'
        searchTitle='Tìm kiếm'
        checkboxSelection
        columns={columns}
        data={data}
        actions={actions}
        pageSize={2}
        options={{
            selection: true,
            // actionsColumnIndex: -1,
        }}
      />
    );
  }
  const columns=[
    
    { title: 'Hình ảnh', field: 'img', render: item => <img src={item.img} alt=""  height="100" width="100" />},
    { title: 'Tên', field: 'name' },
    { title: 'Danh mục', field: 'category' },
    { title: 'Giá(VNĐ)', field: 'price', type:'decimal' },
    {
      title: 'Trạng thái', field: 'status',render:item=> <Switch edge="end" id={item.status } />
    },
    {
        title: 'Chỉnh sửa' ,field: 'delete',  render: item =>   <DeleteIcon id={item.delete} />
      },
  ],
   data=[
    { name: 'Mehm Mehmet MehmetMehmetet', category: 'Baran', price: 1000,   img:'https://www.petcity.vn/media/news/920_cat5_500x462.jpg' },
    { name: 'Mehmet', category: 'Baran', price: 187,   img:'https://vnn-imgs-f.vgcloud.vn/2021/09/07/09/chu-meo-noi-tieng-mang-xa-hoi-voi-phong-cach-thoi-trang-sanh-dieu.jpeg' },
    { name: 'Zerya Betül', category: 'Baran', price: 200,   img:'https://fridaycat.com.vn/wp-content/uploads/2021/04/meo-muop-giong-meo-pho-bien-tren-the-gioi.jpg' },
  ],
   actions=[
    {
      icon: 'delete',
      tooltip: 'Xóa',
      onClick: (event, rowData) => alert("Xóa " + rowData.name)
    }
  ];

export default ShowMenu;