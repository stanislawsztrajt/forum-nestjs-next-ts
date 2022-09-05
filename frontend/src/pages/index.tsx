import React from 'react'
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import axios from 'axios'

interface Props {
  topics: any
}

const Home: NextPage<Props> = ({ topics }: Props) => {
  return (
    <div>
      hej
    </div>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/topics`)

  return {
    props: {
      topics: data
    }
  };
};