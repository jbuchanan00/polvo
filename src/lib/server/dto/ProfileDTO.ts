class ProfileDto {
    user: User = {};
    posts: Post[] = [];
    profilePicture: string = "";
    isSelf: boolean = false;
    pictureExt: string = "";
    userInstagramAuthed: boolean = false;
    oauthUrl: string = "";
}