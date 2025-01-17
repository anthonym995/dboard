import React from 'react';
import FormLayout from "../../../components/Forms/FormLayout";
import DrawerWrapper from "../../../components/Modal/DrawerWrapper";
import { useForm } from "react-hook-form";





export default function FromBlogs({ blogs, isOpen, onCancel} ) {



  return (
    <>
      <DrawerWrapper isOpen={isOpen} onClose={onCancel} title={"Add Blogs"}>
      <FormLayout  
      />
    






        
          
      </DrawerWrapper>
    </>
  )
}
