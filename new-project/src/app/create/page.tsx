'use client'

import PostForm from "@/components/PostForm";
import { useState } from "react";

export default function CreatePost() {
 
    const state = true

    return(
       <>
        <PostForm onState={state}/>
       </>
    )
}