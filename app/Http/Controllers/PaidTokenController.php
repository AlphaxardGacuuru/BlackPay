<?php

namespace App\Http\Controllers;

use App\KopokopoPayment;
use App\PaidToken;
use App\Token;
use Illuminate\Http\Request;

class PaidTokenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PaidToken::where('user_id', 1)
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $in = Token::where('token', $request->input('token'))
            ->orderBy('id', 'desc')
            ->first()
            ->created_at;

        // Check if payment has come through
        $hasPaid = KopokopoPayment::where('sender_phone_number', "0700364446")
            ->where('created_at', '>', $in)
            ->first();

        if ($hasPaid) {
            $paidToken = new PaidToken;
            $paidToken->user_id = 1;
            $paidToken->token = $request->input('token');
            $paidToken->amount = $request->input('amount');
            $paidToken->in = $in;
            $paidToken->out = "";
            $paidToken->save();

            return response('Payment Received', 200);
        } else {
            return response('Payment not recieved', 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PaidToken  $paidToken
     * @return \Illuminate\Http\Response
     */
    public function show(PaidToken $paidToken)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PaidToken  $paidToken
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PaidToken $paidToken)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PaidToken  $paidToken
     * @return \Illuminate\Http\Response
     */
    public function destroy(PaidToken $paidToken)
    {
        //
    }
}
