'use client'

import PostForm from "@/components/PostForm"
import { useState } from "react"

export default function Update() {
    const state = false

    return(
       <>
        <PostForm onState={state}/>
       </>
    )
}