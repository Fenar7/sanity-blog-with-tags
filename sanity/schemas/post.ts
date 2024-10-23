import { Rule } from "sanity"
//creating an objext
export const post = {
    name: "post",
    title:  "Post",
    type: "document",

    fields : [
        {
            name: "title",
            title:  "Title",
            type: "string",
            validation: (Rule: Rule) => Rule.required().error("This field is required")
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            //to generate slug based on what
            options: {source: "title"},
            validation: (Rule: Rule) => Rule.required().error("This field is required")
        },
        {
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        },
        //this is the short text on the blog post
        {
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            validation: (Rule: Rule) => Rule.max(200).error("This field is required")
        },
        {
            name: "body",
            title:  "Body",
            type: "array",
            //defining what type of array it is
            validation: (Rule: Rule) => Rule.required().error("This field is required"),
            of: [
                //this is for rich text element 
                {type: "block"},
                //to add the ability to add images
                {
                    type: "image",
                    fields: [{ type: "text", name: "alt", title:"Alt"}]
                }
            ]
        },
        {
            name: "tags",
            title: "Tags",
            type: "array",
            of: [
                {
                    type: "reference", to: [{type: "tag"}]
                }
            ]
        }
    ]
}