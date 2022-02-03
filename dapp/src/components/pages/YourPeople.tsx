import React from 'react';
import {useState, useEffect} from "react";
import type {FC} from 'react'
import {Button, FormControl, FormLabel, Grid, GridItem, Input, Stack} from '@chakra-ui/react';
import {Text} from '@chakra-ui/layout';


interface Interface {

}

export const YourPeople:FC<Interface>=()=>{
    // const YourPeopleForumPage = [
    //     <ForumPages title={'We want you to know who we are'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPages title={'About Us'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPages title={'Contact Us'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPages title={'Support Project'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
    // ]
    return(
<Text>

    Support Us
    You are the reason we produce the Web Professional Minute. You are what we write about. You are what inspires us to keep delivering this podcast. We are all responsible for our long term success.

    Without you, we don’t exist. If you would like to support our efforts, here’s some specific ways to help.

    Become a sponsor. Although we don’t edit our posts to fit corporate messages, we do offer ad rotations on the homepage as well as audio trailers at the end of each podcast. View Advertising and sponsorship opportunities.
    Become a subscriber. It’s free and easy.
    Subscribe via email. You’ll receive an email each time a new podcast is available.
    Subscribe to our RSS feed. Use the latest browsers (IE and FireFox) or one of these “top ten Windows and Mac feed readers” to automatically receive updates as new podcasts are available.
    Become a content contributor (simple registration).Also you can contribute in several ways, including;Comment on posts that interest you. We enjoy your comments and love building relationships with community. We learn from your comments new ways to improve the service. By commenting, you help us close the feedback loop. Send us some feedback.
    Become an editor (Contact Us). Take your shot at writing 150 words of wisdom, news or editorial. We’ll convert it to a podcast and publish your finest works. You’ll get a valuable link to your own page on our site. You’ll also get a link to your website and your name will be displayed prominently in each post your write. When you Contact Web Pro Minute , we’ll ask if you want to become an editor.
    Link to us from your site. Adding a text link to our site from your site is a vote of confidence. It’s also a great way to share our resources with your visitors.
    Here’s some cut and paste linking information for your page:
    Web Pro Minute
    Web Pro News, Interviews, Reports, Web Professional Profiles
    Visit our feed distributors. We’re syndicated on other websites that have unique, complimentary and helpful services for our content. By supporting these sites and communities, you’re supporting our greater goals of sharing the aloha.
    Here’s a few places to check out:
    Melodeo and Mobilecast have merged. Check us out on your phone (if it doesn’t already work seamlessly).
    Our MyBlogLog Community – Join our community and see what others are writing about.
    Add us to your NetVibes homepage. Get organized 2.0!
    Subscribe to our Podcast on Odeo.
    Send a link to a friend. Share the aloha with one of your friends, students or teachers.
    Bookmark our site. Add out link to your favorite social bookmarking site. Links are provided at the bottom of every post.
</Text>
    )
};

export default YourPeople;