import React from 'react';
import {
  CButton,CImage,CCard,
  CCardBody,CCardHeader,
  CCol,CRow,CTable,CTableRow,
  CTableHead,CTableHeaderCell,
  CTableBody,CTableDataCell,
} from '@coreui/react';
import { DocsExample } from 'src/components';
import { Button } from '@coreui/coreui';
import { useNavigate } from 'react-router-dom'
import CreateItemCategory from './CreateItemCategory';
const ItemCategory =()=> {
    const navigate = useNavigate() ;
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-12">
          <CCardHeader>
            <strong>Item Category</strong>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">

            <CButton onClick={()=>navigate('/base/SystemReference/CreateItemCategory')} color="primary" className="me-md-2">
            Create Category
            </CButton>
            
          </div>
          </CCardHeader>
          <CCardBody>
          <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">SR NO.</CTableHeaderCell>
              <CTableHeaderCell scope="col">Merchant Icon</CTableHeaderCell>
              <CTableHeaderCell scope="col">Item Category Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status(switch)</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action(Edit,Delete)</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope="row">1</CTableHeaderCell>
              <CTableDataCell>
              <CImage rounded fluid src="" />
              </CTableDataCell>
              <CTableDataCell>Thomas ALwa </CTableDataCell>
              <CTableDataCell>ThomasAlwa123@gmail.com</CTableDataCell>
              <CTableDataCell>+1789789563</CTableDataCell>
              <CTableDataCell>Street 14 California</CTableDataCell>
            </CTableRow>
            <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>
            <CImage rounded fluid src="https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?w=213&h=213&c=7&r=0&o=5&pid=1.7" width={20} height={20} />
            </CTableDataCell>
            <CTableDataCell>Johanthan </CTableDataCell>
            <CTableDataCell>Johanthan123@gmail.com</CTableDataCell>
            <CTableDataCell>+1789789555</CTableDataCell>
            <CTableDataCell>Street 20, Manila Philippines</CTableDataCell>
           </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell>
            <CImage rounded fluid src="https://th.bing.com/th/id/OIP.hREHWzNlE4f-u1G6M6s9aAHaFj?w=281&h=211&c=7&r=0&o=5&pid=1.7" width={20} height={20} />
            </CTableDataCell>
            <CTableDataCell>Jason Statam</CTableDataCell>
            <CTableDataCell>Jason.Statam456@gmail.com</CTableDataCell>
            <CTableDataCell>+1789780000</CTableDataCell>
            <CTableDataCell>Active</CTableDataCell>
            <CTableDataCell>Edit</CTableDataCell>
          </CTableRow>
          </CTableBody>
        </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default ItemCategory;
