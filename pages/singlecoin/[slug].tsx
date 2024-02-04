import { axiosInstance } from '@/api/axiosinstance'
import { Root2 } from '@/typescript/interface/single'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'

const singlecoin = () => {
    const router = useRouter()
    const {slug}=router.query
    const { isLoading, data, error } = useQuery({
        queryKey: ["singledata", {slug}],
        queryFn: async () => {
          const data = await axiosInstance.get<Root2>(
            `/v2/assets/${slug}`
          )
          console.log(data);
          return data
        }
      })
  return (
    <>
    <Container>
        <h1 className="text-center mt-5">Single Coin Page</h1>
        <p>{}</p>
    </Container>
    </>
  )
}

export default singlecoin