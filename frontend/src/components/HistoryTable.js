import styled from '@emotion/styled';
import { Pagination, PaginationItem, Typography } from '@mui/material';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

const HistoryTable = ({ history }) => {

    const PAGE_SIZE = 10;
    const [paginationModel, setPaginationModel] = useState({
        pageSize: PAGE_SIZE,
        page: 0,
    });

    const [solvedRowIds, setSolvedRowIds] = useState([]);

    function formatDate(inputDate) {
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
      
        const parts = inputDate.split('T')[0].split('-');
        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1; // Adjust month index
        const day = parts[2];
      
        const month = months[monthIndex];
      
        return `${day} ${month}, ${year}`;
    }

    useEffect(() => {
        const updateSolvedIds = () => history["data"].forEach(el => {
            if (el["isSolved"]) {
                setSolvedRowIds(prev => [...prev, el["id"]])
            }
        });
        updateSolvedIds();
    }, [])

    function CustomPagination() {
        const apiRef = useGridApiContext();
        const page = useGridSelector(apiRef, gridPageSelector);
        const pageCount = useGridSelector(apiRef, gridPageCountSelector);
      
        return (
          <Pagination
            sx={{
                "& .MuiPaginationItem-root": {
                    color: "#fff"
                }
            }}
            variant="outlined"
            shape="rounded"
            page={page + 1}
            count={pageCount}
            renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
          />
        );
    }

    const StyledDataGrid = styled(DataGrid)(() => ({
        color: 'rgba(255,255,255,0.85)',
        WebkitFontSmoothing: 'auto',
        letterSpacing: 'normal',
        '& .MuiDataGrid-columnsContainer': {
          backgroundColor: '#1d1d1d',
        },
        '& .MuiDataGrid-iconSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeader': {
            font: 'bold'
        },
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
          borderRight: '1px solid #303030',
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
          borderBottom: '1px solid #303030',
        },
        '& .MuiDataGrid-cell, .MuiButtonBase-root': {
          color: 'rgba(255,255,255,0.65)',
        },
        '& .MuiPaginationItem-root': {
          borderRadius: 0,
        },
        '& .theme-header': {
          backgroundColor: '#404040'
        }
    }));

    const rows = history["data"].map(entry => ({
        id: entry["id"],
        question: entry["questionTitle"],
        answeredAt: formatDate(entry["answeredAt"]),
        isSolved: entry["isSolved"],
        complexity: entry["complexity"]
    }));

    
    
    const columns = [
        { field: 'question', headerName: 'QUESTION', headerClassName: 'theme-header', headerAlign: 'center', flex: 0.4},
        { field: 'answeredAt', headerName: 'DATE', headerClassName: 'theme-header', headerAlign: 'center', align: 'center', flex: 0.2},
        { field: 'isSolved', headerName: 'SOLVED', headerClassName: 'theme-header', align: 'center', type: 'boolean', flex: 0.2,
            renderCell: (params) => solvedRowIds.includes(params.id)
                ? <CheckIcon sx={{ color: '#008000' }} />
                : <ClearIcon sx={{ color: '#EE4B2B' }} />
        },
        { field: 'complexity', headerName: 'COMPLEXITY', headerClassName: 'theme-header', headerAlign: 'center', align: 'center', flex: 0.2 }
                
    ]

    return (
        <div style={{
            width: '95%',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#FFFFFF',
            paddingBottom: 5
        }}>
          <Typography
            sx={{
              my: 1,
              paddingTop: 1,
              fontWeight: 'bold',
              fontSize: 20,
              color: '#FFFFFF'
            }}
          >
            Answered Questions
          </Typography>
          <StyledDataGrid
              rows={rows}
              columns={columns}
              paginationModel={paginationModel}
              pageSizeOptions={[PAGE_SIZE]}
              onPaginationModelChange={setPaginationModel}
              slots={{
                  pagination: CustomPagination
          }}/>
        </div>
    )
};

export default HistoryTable;