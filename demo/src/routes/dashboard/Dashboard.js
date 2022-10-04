import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';  
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {data} from "../../data/index"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

const Dashboard = () => {


    const [dashboardState, setDashboardState] = useState({
        customers:{
            on_boarding: 0,
            leads: 0,
            claims: 0,
            collections: 0
        },
        tasks:{
            done: 0,
            in_progress: 0,
            stuck: 0
        },
        channels: {
            call_center: 0,
            whatsapp: 0,
            branch: 0,
            agent: 0
        }

    });

    const getStatistics = () =>{
        let on_boarding = 0;
        let leads = 0;
        let claims = 0;
        let collections = 0;
        let unknown_customer_status = 0

        let done = 0;
        let in_progress = 0;
        let stuck = 0;
        let unknown_task_status = 0;

        let call_center = 0;
        let whatsapp = 0;
        let branch = 0;
        let agent = 0;

        data.forEach((user)=>{

            // customer status
            switch (user.customer_status)
            {
                case "Onboarding":
                    on_boarding ++;
                    break;
                case "Lead":
                    leads ++;
                    break;
                case "Claims":
                    claims++;
                    break;
                case "Collections":
                    collections ++;
                    break;
                default:
                    unknown_customer_status++;            
            }

            // task status
            switch (user.status)
            {
                case "Done":
                    done++;
                    break;
                case "In Progress":
                    in_progress ++;
                    break;
                case "Stuck":
                    stuck++;
                    break;
                default:
                    unknown_task_status++;            
            }

            switch (user.channel)
            {
                case "Call centre":
                    call_center++;
                    break;
                case "Whatsapp":
                    whatsapp ++;
                    break;
                case "Branch":
                    branch++;
                    break;
                case "Agent":
                    agent++;
                    break;
                default:
                    unknown_task_status++;            
            }
        });

        // set state
        setDashboardState({
            customers:{
                on_boarding,
                leads,
                claims,
                collections
            },
            tasks:{
                done,
                in_progress,
                stuck
            },
            channels: {
                call_center,
                whatsapp,
                branch,
                agent
            }
    
        })
    }

    useEffect(()=>{
        getStatistics();
    },[])



    return (
        <div className="w-full h-full overflow-y-scroll">
            <h1 className="text-gray-500 font-bold text-xl underline mt-10">Dashboard</h1>

            <div className="flex flex-row w-full mt-5 border-gray-800 border-2 rounded-lg p-5">
                <div className="w-1/4 items-center p-5 mr-2" >
                    <label className="text-gray-500 font-bold text-xl underline">Customer Status</label>
                    <div className="w-full text-gray-500 font-bold">
                        <div>{`On boarding: ${dashboardState.customers.on_boarding}`}</div>
                        <div>{`Leads: ${dashboardState.customers.leads}`}</div>
                        <div>{`Claims: ${dashboardState.customers.claims}`}</div>
                        <div>{`Collections: ${dashboardState.customers.collections}`}</div>
                    </div>
                </div>

                <div className="w-1/4">
                    <Pie
                        data={{
                            labels: ['On boarding' , 'Leads', 'Claims', 'Collections'],
                            datasets:[
                                {
                                    label: "Member Status",
                                    data:[ 
                                        dashboardState.customers.on_boarding,
                                        dashboardState.customers.leads,
                                        dashboardState.customers.claims,
                                        dashboardState.customers.collections
                                    ],
                                    backgroundColor:[
                                        'rgba(0, 0, 255, 0.2)',
                                        'rgba(255, 191, 0, 0.2)',
                                        'rgba(128, 128, 128, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(0, 0, 255, 1)',
                                        'rgba(255, 191, 0, 1)',
                                        'rgba(128, 128, 128, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                }
                            ]
                        }}
                    />
                    
                </div>
            </div>

            <div className="flex flex-row w-full mt-5 border-gray-800 border-2 rounded-lg p-5">
                <div className="w-1/4 items-center p-5 mr-2" >
                    <label className="text-gray-500 font-bold text-xl underline">Task Status</label>
                    <div className="w-full text-gray-500 font-bold">
                        <div>{`Done: ${dashboardState.tasks.done}`}</div>
                        <div>{`In Progress: ${dashboardState.tasks.in_progress}`}</div>
                        <div>{`Stuck: ${dashboardState.tasks.stuck}`}</div>
                    </div>
                </div>

                <div className="w-1/4">
                    <Bar 
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Tasks bar chart',
                                },
                            },
                        }} 
                        data={{
                            labels: ['Done', 'In progress', 'Stuck'],
                            datasets: [
                                {
                                    label: ['Task status'],
                                    data: [dashboardState.tasks.done, dashboardState.tasks.in_progress, dashboardState.tasks.stuck],
                                    backgroundColor: ['rgba(0, 128, 0, 0.5)','rgba(255, 191, 0, 0.5)', 'rgba(255, 0, 0, 0.5)' ],
                                }
                            ],
                        }} 
                    />
                </div>
            </div>

            <div className="flex flex-row w-full mt-5 border-gray-800 border-2 rounded-lg p-5">
                <div className="w-1/4 items-center p-5 mr-2" >
                    <label className="text-gray-500 font-bold text-xl underline">Channels</label>
                    <div className="w-full text-gray-500 font-bold">
                        <div>{`Call center: ${dashboardState.channels.call_center}`}</div>
                        <div>{`Whatsapp: ${dashboardState.channels.whatsapp}`}</div>
                        <div>{`Branch: ${dashboardState.channels.branch}`}</div>
                        <div>{`Agent: ${dashboardState.channels.agent}`}</div>
                    </div>
                </div>

                <div className="w-1/4">
                    <Doughnut 
                        data={{
                            labels:['Call Center', 'Whatsapp','Branch', 'Agent'],
                            datasets:[
                                {
                                    label: "Communication Channel",
                                    data: [
                                        dashboardState.channels.call_center, 
                                        dashboardState.channels.whatsapp,
                                        dashboardState.channels.branch,
                                        dashboardState.channels.agent
                                    ],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                    ],
                                }
                            ]
                        }}
                    />
                </div>
            </div>
        </div>
    )

}

export default Dashboard;