using HospitalMS.Models;
using Microsoft.AspNetCore.Mvc;

namespace HospitalMS.Controllers
{
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.Authenticate(request.Username, request.Password);
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized("Invalid credentials");
            }
            return Ok(new { Token = token });
        }
    }
}
