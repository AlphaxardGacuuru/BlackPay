<?php

namespace App\Http\Controllers;

use App\Token;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TokenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Token::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "token" => "required|max:4",
        ]);

        $token = new Token;
        $token->token = $request->input("token");
        $token->user_id = 1;
        $token->type = $request->input("type");
        $token->save();

        return response("Token Saved", 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Token  $token
     * @return \Illuminate\Http\Response
     */
    public function show($token)
    {
        $token = Token::where('token', $token)
            ->orderBy('id', 'desc')
            ->first();

        $in = $token->created_at;

        // Check if type is in
        if ($token->type == "in") {

            $now = Carbon::now();

            $timetaken = Carbon::parse($in)->diffInHours($now);

            $charge = $timetaken * 50;

			$charge = $charge + 50;

            return response([
                'charge' => $charge,
                'timetaken' => $timetaken],
                200);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Token  $token
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Token $token)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Token  $token
     * @return \Illuminate\Http\Response
     */
    public function destroy(Token $token)
    {
        //
    }
}
