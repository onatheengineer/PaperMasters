interface SocialMediaDictionaryInterface{
    Discord: string,
    Twitter: string,
    Linkedin: string,
    YouTube:string,
    Instagram:string,
    Twitch: string,
    Facebook: string,
    Reddit:string,
    GitHub:string,
    OpenSea:string,
    socialButtonGeneric1: string,
    socialButtonGeneric2: string,
}

export interface identityPageDictionaryInterface{
    walletAccount:string,
    walletAccountLink?: string,
    linkToFinishedAvatar?: string,
    ownerName:string,
    ownerEmail:string,
    ownerDescription:string,
    aliasProfileLinks:SocialMediaDictionaryInterface,
    emailValidationNotification:boolean,
    emailReportNotification:boolean,
}

