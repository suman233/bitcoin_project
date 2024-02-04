import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Container, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { axiosInstance } from "@/api/axiosinstance";
import { Root } from "react-dom/client";
import { endPoints } from "@/api/endpoints";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["coinlists"],
    queryFn: async () => {
      const data = await axiosInstance.get<Root[]>(
        endPoints.fetchedCoinDetails.allcoins
      )
      console.log(data?.data?.data);
      return data?.data?.data
    }
  })
  
  const columns: GridColDef[] = [
    {
      field: 'rank',
      headerName: 'Rank',
      width: 30,
    },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Coin name', width: 130 },
    { field: 'supply', headerName: 'Supply', width: 160 },
    
    {
      field: 'symbol',
      headerName: 'Symbol',
      width: 90,
    },
    {
      field: 'priceUsd',
      headerName: 'Price (USD)',
      width: 130,
    },
    {
      field: 'marketCapUsd',
      headerName: 'Market Cap (USD)',
      width: 160,
    },
    {
      field: 'volumeUsd24Hr',
      headerName: 'Volume in 24Hr (USD)',
      width: 160,
    },
    {
      field: 'vwap24Hr',
      headerName: 'VWap (USD)',
      width: 130,
    },
  ]
  const [page, setPage] = useState(1);

  const listperpage:number = 10
  const lastIndex:number = page * listperpage
  const firstIndex:number = lastIndex - listperpage
  const listrecords = data?.slice(firstIndex, lastIndex)
  const noOfPages = Math.ceil(data?.length / listperpage)
  const handlePage = (event, value) => {
      setPage(value);
  };
  
  
  const rows = listrecords?.map((item, index)=>{
    item["index"]=index;
    return (
     item
    )
  })

  return (
    <>
      <Container>

        <Typography variant="h2" textAlign={'center'} sx={{ my: 3 }}>Home page</Typography>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: listperpage, pageSize: noOfPages },
              },
            }}
            pageSizeOptions={[listperpage, listperpage+listperpage]}
          />
          
        </div>
        {
          data?.map((item, index) => {
            return (
              <>
                <h1>{item?.name}</h1>

              </>
            )
          })
        }
       
      </Container>

    </>
  );
}
