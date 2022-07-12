<?php

namespace App\Http\Controllers;

use App\KopokopoPayment;
use App\PaidToken;
use App\Token;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaidTokenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Check if user is logged in
        if (Auth::check()) {
            $getPaidTokens = PaidToken::where('user_id', auth()->user()->id)
                ->get();

            $paidTokens = [];

            foreach ($getPaidTokens as $paidToken) {

                $in = Carbon::parse($paidToken->in)->format("d M Y H:i");

                array_push($paidTokens, [
                    'id' => $paidToken->id,
                    'token' => $paidToken->token,
                    'amount' => $paidToken->amount,
                    'in' => $in,
                    'created_at' => $paidToken->created_at->format("d M Y H:i"),
                ]);
            }

            return response($paidTokens, 200);
        } else {
            return [];
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $betterPhone = substr_replace(auth()->user()->phone, '+254', 0, -9);

        $in = Token::where('token', $request->input('token'))
            ->orderBy('id', 'desc')
            ->first()
            ->created_at;

        // Check if payment has come through
        $hasPaid = KopokopoPayment::where('sender_phone_number', $betterPhone)
            ->where('created_at', '>', $in)
            ->first();

        if ($hasPaid) {
            $paidToken = new PaidToken;
            $paidToken->user_id = auth()->user()->id;
            $paidToken->token = $request->input('token');
            $paidToken->amount = $request->input('amount');
            $paidToken->in = $in;
            $paidToken->save();

            return response('Payment Received', 200);
        } else {
            return response('Payment not recieved', 200);
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
