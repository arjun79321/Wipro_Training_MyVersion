﻿namespace HospitalMS.Models
{
    public interface IAuthService
    {
        Task<string> Authenticate(string username, string password);
    }
}
