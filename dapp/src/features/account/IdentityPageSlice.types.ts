interface SocialMediaInterface{
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

export interface identityPageInterface {
    walletAccount: string,
    linkToFinishedAvatar?: string,
    ownerName: string,
    ownerEmail: string,
    ownerDescription: string,
    socialMediaLinks: SocialMediaInterface,
    emailValidationNotification: boolean,
    emailReportNotification: boolean,
}

interface AccountSlice {
    putDBAccountDictionary: identityPageInterface;
    getDBAccountDictionary: identityPageInterface;
    userSameAccountBool: boolean;
    accountError: string,
}



