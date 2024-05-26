"use client";

import React, { useState, useEffect, useCallback, createRef } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useAuthContext } from '../contexts/AuthContexts';
import { requestsMock, tgStarter } from '../mocks';
import { zuAuthPopup } from "@pcd/zuauth";
// import { ZkEdDSAEventTicketPCDPackage } from "@pcd/zk-eddsa-event-ticket-pcd";
import { authenticate } from "@pcd/zuauth/server";
import { ZuAuthArgs } from "@pcd/zuauth";
import { ETHBERLIN04 } from "@pcd/zuauth/configs/ethberlin"
import { getRandomValues, hexToBigInt, toHexString } from "@pcd/util";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SubmitQueryData {
  title: string;
  description: string;
  telegramUsername: string;
}


export default function Home() {
  const tabRef = createRef<HTMLDivElement>();
  const [requests, setRequests] = useState(requestsMock)
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { connect, token } = useAuthContext();
  const [formData, setFormData] = useState({
    telegramUsername: '',
    title: '',
    description: '',
  });
  const [currentTab, setCurrentTab] = useState("account");

  async function submitQuery(data: SubmitQueryData, token: string) {
    try {
      const response = await axios.post(
        '/api/queries',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData({ telegramUsername: "", title: "", description: "" });
      alert("Request Created Successfully!!!");
      fetchData();
      setCurrentTab("account");
    } catch (error) {
      console.error('Error submitting query:', error);
      throw error;
    }
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const fetchData = useCallback(() => {
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/queries');
        console.log(response.data)
        setQueries(response.data.queries);
      } catch (error) {
        console.error('Error fetching queries:', error);
        // setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const truncateText = (text: string, length: number) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <>
      <section className="h-screen flex p-0 relative overflow-hidden flex-col w-full border-b border-b-[#111110]">
        <div className="flex justify-between absolute top-12 left-0 w-full border-b-[1px] border-b-[#111110] items-center px-12 py-2">
          <Link href={"/home"} className="text-3xl font-bold font-cabin text-[#111110]  flex items-center gap-x-2">
            <img src="/gb.png" className="w-10" />
            <h1>P2P Mentorship</h1>
          </Link>
          <div className="flex gap-x-8 text-xl font-cabin z-10">
            {/* <h1>Issues</h1> */}
            <Link href="/home">Issues</Link>
            <Link href="/mentors">Mentors</Link>
            <Link href="/map">Map</Link>
          </div>
        </div>
        <div className="h-full absolute top-0 w-[1px] bg-[#111110] left-8" />
        {/* <div className="h-1/2 absolute top-0 w-[1px] bg-[#111110] right-8" /> */}
        <div className="h-full absolute top-0 w-[1px] bg-[#111110] left-1/2" />
        <div className="w-full absolute top-1/2 h-[1px] bg-[#111110] left-0" />
        <div className="w-1/2 absolute bottom-10 h-[1px] bg-[#111110] left-1/2" />
        {/* <div className="h-1/2 absolute top-1/2 w-[1px] bg-[#111110] left-48 " /> */}
        <div className="overflow-hidden whitespace-nowrap py-1 bg-[#FFF348] border-b border-[#111110] z-10">
          <div className="inline-block animate-marquee">
            <p className="inline-block px-4 uppercase text-[#1f4b60] font-medium">
            P2P Mentorship is an innovative platform that connects individuals seeking guidance on web3 technologies with experienced mentors. Users can ask questions, receive personalized help, and build valuable skills through peer-to-peer interactions.{" "}
            </p>
          </div>
        </div>
        <div className="h-1/3 w-full flex flex-col justify-end py-8 px-16 -translate-x-10">
          <h1 className="text-[#111110] text-6xl font-bold self-end text-end font-cabin">
            Accelerate your Web3 journey <br /> with expert guidance
          </h1>
        </div>
        <div className="w-full h-2/3 relative flex flex-col p-16 ">
          <div className="bg-white text-black z-10 w-1/2 self-end rounded-xl p-8 flex flex-col gap-y-4 shadow-xl border border-black -translate-x-10">
            <p className="text-lg font-cabin ">
            P2P Mentorship is an innovative platform that connects individuals seeking guidance on web3 technologies with experienced mentors. Users can ask questions, receive personalized help, and build valuable skills through peer-to-peer interactions.
            </p>
            <button className="self-end bg-[#FFF348] px-6 py-2 rounded-3xl border border-black hover:scale-105 duration-300 ease-in font-mediums">
              Request Help
            </button>
          </div>
          <div className="absolute top-0 w-full h-2/3 bg-gradient-to-t to-white from-[#ffffff00]  -z-10 left-0" />
          <video
            src="/gradient.mp4"
            preload="auto"
            autoPlay
            loop
            muted
            className="object-cover w-full -z-20 h-full absolute top-0 left-0"
          />
        </div>
      </section>
      <section className="my-6">
        <h1 className="px-8 py-8 text-4xl font-cabin font-bold border-t border-t-[#111110]">
          Offer Guidance
        </h1>
        <div className="flex flex-wrap w-full border-t border-t-[#111110]">
        {!queries ? "" : queries.map((issue, i) => (
            <div
              key={i}
              className="px-4 py-8 w-[20%] border-r border-b border-b-[#111110] border-r-[#111110] justify-between flex flex-col min-h-[25vh] gap-y-6 hover:bg-[#fff348d7] "
            >
              <div className="flex flex-col gap-y-1">
                <h1 className="text-lg text-[#111110] font-medium">
                  {issue?.title}
                </h1>
                <p className="text-sm">
                  {expandedIndex === i
                    ? issue?.description
                    : truncateText(issue?.description, 80)}
                </p>
              </div>
              <div className="self-end gap-x-2 flex">
                <button
                  className="text-sm self-end border border-[#111110] py-1 px-3 rounded-2xl bg-white"
                  onClick={() => handleToggle(i)}
                >
                  {expandedIndex === i ? "Read Less" : "Read More"}
                </button>
                <a 
                  key={issue?.id}
                  href={`https://t.me/${issue?.telegramUsername?.replace(/^@/, '')}?text=${tgStarter}`} target="_blank">
                    <button className="text-sm self-end border border-[#111110] py-1 px-3 rounded-2xl bg-white">
                      Help
                    </button>
                </a>
                {/* <button className="text-sm self-end border border-[#111110] py-1 px-3 rounded-2xl bg-white">
                  Guide
                </button> */}
              </div>
            </div>
          ))}
          {/* {data.map((issue, i) => (
            <div
              key={i}
              className="px-4 py-8 w-[20%] border-r border-b border-b-[#111110] border-r-[#111110] justify-between flex flex-col min-h-[25vh] gap-y-6 hover:bg-[#fff348d7] "
            >
              <div className="flex flex-col gap-y-1">
                <h1 className="text-lg text-[#111110] font-medium">
                  {issue.title}
                </h1>
                <p className="text-sm">
                  {expandedIndex === i
                    ? issue.problem
                    : truncateText(issue.problem, 80)}
                </p>
              </div>
              <div className="self-end gap-x-2 flex">
                <button
                  className="text-sm self-end border border-[#111110] py-1 px-3 rounded-2xl bg-white"
                  onClick={() => handleToggle(i)}
                >
                  {expandedIndex === i ? "Read Less" : "Read More"}
                </button>
                <button className="text-sm self-end border border-[#111110] py-1 px-3 rounded-2xl bg-white">
                  Guide
                </button>
              </div>
            </div>
          ))} */}
        </div>
      </section>

      <section className="bg-[#30c4ffca] py-6 flex flex-col relative">
        <div className="h-full absolute top-0 w-[1px] bg-[#111110] left-4" />

        <div className="h-full absolute top-0 w-[1px] bg-[#111110] left-2/3 translate-x-10" />
        <div className="w-1/2 absolute bottom-10 h-[1px] bg-[#111110] left-1/2" />

        <div className="w-full absolute top-1/3 h-[1px] bg-[#111110]" />
        <div className="h-2/3 absolute top-1/3 w-[1px] bg-[#111110] left-1/2" />
        <h1 className="px-8 py-8 text-4xl font-cabin text-[#11110] font-bold border-t border-t-black">
          Get Guidance
        </h1>
        <div className="mt-4 px-16 pt-12 pb-16 rounded-2xl relative flex flex-col gap-y-4 w-[35vw] z-10 ">
          <div className="z-10">
            <h1>Telegram Name</h1>
            <input className="w-full border border-black p-1 rounded-md" id="tg" name="telegramUsername" placeholder="@Telegram_Username" onChange={handleChange} value={formData.telegramUsername} />
          </div>
          <div className="z-10">
            <h1>Title</h1>
            <input className="w-full border border-black p-1 rounded-md" id="title" name="title" placeholder="Hackathon Problem" onChange={handleChange} value={formData.title} />
          </div>
          <div className="z-10">
            <h1>Problem</h1>
            <textarea className="w-full border border-black p-1 rounded-md" id="description" name="description" placeholder="Detailed hackathon problem description" onChange={handleChange} value={formData.description} />
          </div>
          {/* <button className="bg-[#FFF348] self-end px-4 py-1 rounded-md">
            Connect
          </button> */}
          {token ? <button className="bg-[#FFF348] self-end px-4 py-1 rounded-md"
                onClick={() =>
                  submitQuery(formData, token)
                }
              >
                Request
              </button> : <button className="bg-[#FFF348] self-end px-4 py-1 rounded-md"
              onClick={connect}>Connect</button>}
        </div>
        {/* <video
          src="/gradient.mp4"
          loop
          autoPlay
          className="rounded-2xl top-0 left-0 object-fill absolute h-full opacity-70 w-full -z-1"
        /> */}
      </section>
    </>
  );
}

const data = [
  {
    title: "Decentralized Identity Verification",
    problem:
      "Current identity verification systems are centralized and vulnerable to data breaches and misuse, leading to potential identity theft and loss of personal information.",
  },
  {
    title: "Blockchain-Based Voting System",
    problem:
      "Traditional voting systems lack transparency and are susceptible to fraud and tampering. There is a need for a secure and verifiable voting process to ensure democratic integrity.",
  },
  {
    title: "Smart Contract Escrow Service",
    problem:
      "Online transactions often lack trust between parties and can result in disputes and fraud, making it difficult to ensure that both parties fulfill their obligations.",
  },
  {
    title: "Decentralized Finance (DeFi) Lending Platform",
    problem:
      "Traditional banking systems limit access to loans and impose high interest rates on borrowers, often excluding those without a strong credit history.",
  },
  {
    title: "NFT Marketplace for Digital Art",
    problem:
      "Artists struggle to monetize their digital creations and protect their intellectual property. There is a need for a platform that allows artists to sell and trade their digital art securely.",
  },
  {
    title: "Supply Chain Transparency Solution",
    problem:
      "Supply chains are often opaque, leading to issues with product authenticity and ethical sourcing. Consumers and businesses lack visibility into the origins and journey of products.",
  },
  {
    title: "Decentralized Cloud Storage",
    problem:
      "Centralized cloud storage providers have control over user data and are prone to data breaches. Users need a more secure and private way to store and share their files.",
  },
  {
    title: "Blockchain-Based Healthcare Records",
    problem:
      "Medical records are fragmented and patients lack control over their own health data. A unified, secure system is needed to manage and share healthcare records.",
  },
];
