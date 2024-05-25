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
import { useAuthContext } from './contexts/AuthContexts';
import { requestsMock, tgStarter } from './mocks';

interface SubmitQueryData {
  title: string;
  description: string;
  telegramUsername: string;
}


// async function handleSubmitingRequest(queryData: SubmitQueryData, token: string) {
//   // const queryData = {
//   //   title: 'My Query Title',
//   //   description: 'This is a detailed description of my query.',
//   //   telegramUsername: '@johndoe',
//   // };
  
//   submitQuery(queryData, token)
//     .then(() => {
//       console.log('Query submission handled successfully.');
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }

export default function Home() {
  const tabRef = createRef<HTMLDivElement>();
  const [requests, setRequests] = useState(requestsMock)
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {connect, token} = useAuthContext();
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
      setFormData({telegramUsername: "", title: "", description: ""});
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


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Tabs value={currentTab} onValueChange={setCurrentTab} defaultValue="account" className="w-[400px] lg-w-[600px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Offer Help</TabsTrigger>
          <TabsTrigger value="password">Get Mentorship</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Become Mentor</CardTitle>
              <CardDescription>
                Offer your help to newcomers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ScrollArea className="h-screen/2">
                <div className="flex flex-col gap-2 p-4 pt-0">
                  {!queries ? "" : (
                    queries.map((item: any) => (
                      <a 
            key={item?.id}
            href={`https://t.me/${item?.telegramUsername?.replace(/^@/, '')}?text=${tgStarter}`} target="_blank"
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              "bg-muted"
            )}
            >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item?.title}</div>
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                  )}
                >
                  {/* {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })} */}
                  {/* ToDo */}
                  {/* {
                    item.date
                  } */}
                </div>
              </div>
              <div className="text-xs font-medium">@{item?.telegramUsername?.replace(/^@/, '')}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.description.substring(0, 300)}
            </div>
          </a>
                    )))}</div>
              </ScrollArea>
            </CardContent>
            {/* <CardFooter>
            <Button>Help</Button>
          </CardFooter> */}
          </Card >
        </TabsContent >
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Get Mentorship</CardTitle>
              <CardDescription>
                Get immediate help from volunteers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="tg">Telegram Name</Label>
                <Input id="tg" name="telegramUsername" placeholder="@Telegram_Username" onChange={handleChange} value={formData.telegramUsername} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Hackathon Problem" onChange={handleChange} value={formData.title} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="description">Problem</Label>
                <Textarea id="description" name="description" placeholder="Detailed hackathon problem description" onChange={handleChange} value={formData.description} />
              </div>
            </CardContent>
            <CardFooter>
              {token ? <Button
              onClick={() =>
                submitQuery(formData, token)
              }
              >
                Request
              </Button> : <Button onClick={connect}>Connect</Button>}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs >
    </main >
  );
}
