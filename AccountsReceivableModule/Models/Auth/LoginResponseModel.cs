namespace AccountsReceivableModule.Models
{
    public class LoginResponseModel
    {
        //      {
        //"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzAzNzI1NDYzLCJleHAiOjE3MDM4MTE4NjN9.DnI0oeI7FmYwRJPos8dxQ1HeMNXsGdpkQx4uXS-q5nQ",
        //"username": "user2",
        //"email": "user1@user.com",
        //"functions": [
        //  "function-2",
        //  "function-1",
        //  "function-3",
        //  "function-4"
        //]
        //  }
        public string? Token { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string[]? Functions { get; set; }

        public LoginResponseModel() { }
        public LoginResponseModel(string? token, string? username, string? email, string[]? functions)
        {
            Token = token;
            Username = username;
            Email = email;
            Functions = functions;
        }

    }
}
