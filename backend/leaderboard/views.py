# users_list/views.py
from django.shortcuts import render
from authentication.models import User


def leaderboard(request):
    users = User.objects.all()
    # print("\t\t\t NUM OF USERS: ", end='')
    # print(len(users))
    # print(users)
    # for user in users:
    #     print(user)
    context = {'users' : users}
    return render(request, 'leaderboard/leaderboard.html', context)



# NOT READY YET
def send_friend_request(request):
    if request.method == 'POST':
        sender_id = request.user.id  # Assuming you have a logged-in user
        receiver_id = request.POST.get('receiver_id')

        # Check if the friendship already exists
        existing_friendship = Friendship.objects.filter(sender_id=sender_id, receiver_id=receiver_id).first()

        if existing_friendship:
            messages.error(request, 'Friend request already sent.')
        else:
            # Create a new friendship request
            friendship = Friendship(sender_id=sender_id, receiver_id=receiver_id)
            friendship.save()
            messages.success(request, 'Friend request sent successfully.')

        return redirect('leaderboard')
    else:
        # Redirect to leaderboard page if the request method is not POST
        return redirect('leaderboard')