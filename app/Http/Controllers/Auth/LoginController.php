<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\User;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
     */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function redirectToProvider($website)
    {
        return Socialite::driver($website)->redirect();
    }

    /**
     * Obtain the user information from GitHub/Google/Twitter/Facebook.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback($website)
    {
        $user = Socialite::driver($website)->user();

        if ($user->getName()) {
            $name = $user->getName();
        } else {
            $name = " ";
        }

        if ($user->getEmail()) {
            $email = $user->getEmail();
        } else {
            return redirect('/');
        }

        if ($user->getAvatar()) {
            $avatar = $user->getAvatar();
        } else {
            $avatar = "profile-pics/male_avatar.png";
        }

        // Get Database User
        $dbUser = User::where('email', $user->getEmail());

        // Check if user exists
        if ($dbUser->exists()) {

            Auth::login($dbUser->first(), true);

            return redirect()->intended();
        } else {
            $name = $user->getName();
            $email = $user->getEmail();
            $avatar = $user->getAvatar();
            // Remove forward slashes
            $avatar = str_replace("/", " ", $avatar);

            return redirect('/#/register/' . $name . '/' . $email . '/' . $avatar);
        }
    }

    // public function logout(Request $request)
    // {
    //     return Auth::logout();
    // }
}
